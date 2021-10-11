import { DeleteOutlined } from '@ant-design/icons'
import { notification } from 'antd'
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import todosAPI from '../../service/todos'
import { Todos } from '../../models/todos'
import Presenter from './Presenter'
const openNotification = (status: string, content: string) => {
  if (status === 'success') {
    notification.success({
      duration: 3,
      message: 'Success',
      description: content,
    })
  } else {
    notification.error({
      duration: 3,
      message: 'Error',
      description: content,
    })
  }
}
const Todo: React.FC = () => {
  const [radio, setRadio] = useState<string>('default')
  const [todosValue, setTodosValue] = useState<string>('')
  const [todosTemp, setTodosTemp] = useState<Todos[]>()
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>()
  const [loading, setLoading] = useState<boolean>(true)
  const [visible, setVisible] = useState<boolean>(false)
  const [valueRow, setValueRow] = useState<Todos[]>()
  const [todos, setTodos] = useState<Todos[]>()
  const onSelectChange = (selectedRowKeys: Todos, value: Todos[]): void => {
    setSelectedRowKeys(selectedRowKeys)
    setValueRow(value)
  }
  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
    setValueRow([])
  }
  const rowSelection: any = {
    selectedRowKeys,
    valueRow,
    onChange: onSelectChange,
  }
  const getAllTodos = async () => {
    try {
      setLoading(true)
      const res = await todosAPI.getAll()
      // check status api
      if (res.status === 200) {
        setTodos(res.data)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }
  useEffect(() => {
    getAllTodos()
  }, [])
  const handleDeleteItem = async (record: Todos) => {
    try {
      if (record && record.id && record.id !== '') {
        const res = await todosAPI.deleteTodos(record.id)
        if (res.status === 200 || res.status === 201) {
          await getAllTodos()
          openNotification(
            'success',
            `Successfully deleted todos "${record.content}"`,
          )
        }
      }
    } catch (error) {}
  }
  const columns = [
    {
      title: 'Content',
      dataIndex: 'content',
      render: (text: any, record: any) => (
        <div
          onClick={() => handleUpdateObject(record)}
          style={{ color: 'blue', cursor: 'pointer' }}
        >
          {text}
        </div>
      ),
    },
    {
      title: 'UserID',
      dataIndex: 'user_id',
    },
    {
      title: 'Created Date',
      dataIndex: 'created_date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text: any, record: any) => (
        <DeleteOutlined
          onClick={() => handleDeleteItem(record)}
          style={{ color: 'red', fontSize: '1.5rem', cursor: 'pointer' }}
        />
      ),
    },
  ]
  const handleTodosValue = (e: any): void => {
    const { value } = e.target
    setTodosValue(value)
  }
  const createTodos = async (object: Todos) => {
    try {
      setLoading(true)
      const res = await todosAPI.createTodos(object)
      // check status api
      if (res.status === 200 || res.status === 201) {
        await getAllTodos()
        setTodosValue('')
        openNotification(
          'success',
          `Create todos with content ${object.content} successfully.`,
        )
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }
  const handleComplete = (status: string): void => {
    let flag = 0
    // check todos content
    if (todosValue === '') {
      openNotification('error', 'You have not written content for todos')
    } else {
      // check content exist
      if (todos && todos.length > 0) {
        todos.forEach((values, index) => {
          if (values.content === todosValue) {
            flag++
          }
        })
      }
      // todos doesn't have this conent
      if (flag === 0) {
        // get user_id from localStorage
        const user_id = localStorage.getItem('user_id')
        let now = moment()
        // get date now using moment
        const object = {
          content: todosValue,
          user_id: String(user_id),
          created_date: now.format('YYYY-MM-DD, HH:mm:ss'),
          status: status,
        }
        createTodos(object)
      } else {
        openNotification('error', `Content ${todosValue} already exists`)
      }
    }
  }
  const handleRadio = async (e: any) => {
    const { value } = e.target
    setSelectedRowKeys([])
    if (value === 'default') {
      await getAllTodos()
      setTodosTemp([])
      setRadio(value)
      openNotification('success', 'Show all successful todos.')
    } else {
      setRadio(value)
      // check array todos
      if (todos && todos.length > 0) {
        setLoading(true)
        const result = todos.filter((values, index) => {
          // filter all todos status === radio user
          return values.status.toLowerCase() === value.toLowerCase()
        })
        // check array result
        if (result && result.length > 0) {
          setTodosTemp([...result])
        }
        setLoading(false)
        openNotification(
          'success',
          `Filter todos by status ${value} successful.`,
        )
      }
    }
  }
  const handleAll = async () => {
    await getAllTodos()
    setTodosTemp([])
    setRadio('default')
    setSelectedRowKeys([])
    openNotification('success', 'Show all successful todos.')
  }
  const handleTodosDeleteAll = async (id: string) => {
    try {
      setLoading(true)
      const res = await todosAPI.deleteTodos(id)
      if (res.status === 200 || res.status === 201) {
        await getAllTodos()
        if (todos && todos.length > 0) {
          await handleDeleteAll()
        } else {
          openNotification('success', 'Clear all todos successfully')
        }
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }
  const handleDeleteAll = async () => {
    // check todos before delete all
    if (todos && todos.length > 0) {
      // Run a for loop to call api delete each object
      todos.forEach((values) => {
        if (values && values.id && values.id !== '') {
          handleTodosDeleteAll(values.id)
        }
      })
    }
  }
  const handleUpdateTodos = async (object: Todos) => {
    try {
      setLoading(true)
      const res = await todosAPI.updateTodos(object)
      if (res.status === 200 || res.status === 201) {
        await getAllTodos()
        setSelectedRowKeys([])
        openNotification(
          'success',
          `Update todos "${object.content}" was successful.`,
        )
        onClose()
        setValueRow([])
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }
  const handleUpdate = (): void => {

    // check array
    valueRow &&
      valueRow.forEach((values, index) => {
        handleUpdateTodos({ ...values })
      })
  }
  const handleUpdateObject = (object: Todos): void => {
    const arrayTemp = valueRow && valueRow.length > 0 ? [...valueRow] : []
    arrayTemp.push(object)
    setValueRow([...arrayTemp])
    setVisible(true)
  }
  return (
    <Presenter
      todosValue={todosValue}
      onClose={onClose}
      visible={visible}
      handleUpdate={handleUpdate}
      valueRow={valueRow}
      todos={todos}
      todosTemp={todosTemp}
      columns={columns}
      rowSelection={rowSelection}
      handleRadio={handleRadio}
      radio={radio}
      loading={loading}
      showDrawer={showDrawer}
      selectedRowKeys={selectedRowKeys}
      handleTodosValue={handleTodosValue}
      handleAll={handleAll}
      handleComplete={handleComplete}
      handleDeleteAll={handleDeleteAll}
    />
  )
}
export default Todo
