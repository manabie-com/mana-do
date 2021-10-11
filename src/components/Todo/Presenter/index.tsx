import React from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import styles from './../TodoPage.module.scss'
import { Input, Row, Col, Button, Table, Radio } from 'antd'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { PropsTodos } from '../../../models/todos'
import UpdateTodos from './UpdateTodos'
const Presenter: React.FC<PropsTodos> = ({
  todosValue,
  onClose,
  visible,
  todos,
  todosTemp,
  columns,
  valueRow,
  rowSelection,
  handleRadio,
  radio,
  loading,
  handleUpdate,
  showDrawer,
  selectedRowKeys,
  handleTodosValue,
  handleAll,
  handleComplete,
  handleDeleteAll,
}) => {
  return (
    <div className={styles['todo']}>
      <div className={styles['todo-back']}>
        <Link onClick={() => localStorage.clear()} to="/">
          <ArrowLeftOutlined style={{ fontSize: '1.5rem' }} />
        </Link>
      </div>
      <Row className={styles['todo-btn']}>
        <div className={styles['todo-input']}>
          <Input
            value={todosValue}
            onChange={handleTodosValue}
            className={styles['todo__child-input']}
            allowClear
            placeholder="Input todos"
          />
        </div>
        <Col style={{ width: '100%' }} xs={24} sm={24} md={11} lg={11} xl={11}>
          <Row className={styles['todo__left-btn']}>
            <Col
              style={{ width: '100%' }}
              xs={24}
              sm={11}
              md={11}
              lg={7}
              xl={7}
            >
              <Button
                onClick={handleAll}
                className={styles['todo__left__all-btn']}
                type="primary"
              >
                All
              </Button>
            </Col>
            <Col
              style={{ width: '100%' }}
              xs={24}
              sm={11}
              md={11}
              lg={7}
              xl={7}
            >
              <Button
                onClick={() => handleComplete('active')}
                className={styles['todo__left__all-btn']}
                type="primary"
              >
                Active
              </Button>
            </Col>
            <Col
              style={{ width: '100%' }}
              xs={24}
              sm={11}
              md={11}
              lg={7}
              xl={7}
            >
              <Button
                onClick={() => handleComplete('completed')}
                className={styles['todo__left__all-btn']}
                type="primary"
              >
                Completed
              </Button>
            </Col>
          </Row>
        </Col>
        <Col style={{ width: '100%' }} xs={24} sm={24} md={11} lg={11} xl={11}>
          <div className={styles['todo__clear__parent-btn']}>
            <Button
              onClick={handleDeleteAll}
              className={styles['todo__clear-btn']}
              type="primary"
            >
              Clear all todos
            </Button>
          </div>
        </Col>
      </Row>
      <div className={styles['todo-radio']}>
        <Radio.Group onChange={handleRadio} value={radio}>
          <Radio value="default">All</Radio>
          <Radio value="active">Active</Radio>
          <Radio value="completed">Completed</Radio>
        </Radio.Group>
      </div>
      {selectedRowKeys && selectedRowKeys.length > 0 ? (
        <div onClick={showDrawer} className={styles['todo-update']}>
          <Button style={{ width: '7.5rem', height: '2.5rem' }} type="primary">
            Update
          </Button>
        </div>
      ) : (
        ''
      )}
      <div
        style={{
          width: '100%',
          marginTop: '2rem',
          border: '1px solid rgb(226, 216, 216)',
        }}
      >
        <Table
          bordered
          rowKey="id"
          loading={loading}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={
            todosTemp && todosTemp.length > 0
              ? todosTemp.reverse()
              : todos && todos.reverse()
          }
        />
      </div>
      <UpdateTodos
        handleUpdate={handleUpdate}
        valueRow={valueRow}
        visible={visible}
        onClose={onClose}
      />
    </div>
  )
}
export default Presenter
