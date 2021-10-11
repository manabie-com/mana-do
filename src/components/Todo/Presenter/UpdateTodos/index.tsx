import React from 'react'
import styles from './../../TodoPage.module.scss'
import { Input, Button, Drawer } from 'antd'
import { PropsTodosChild } from '../../../../models/todos'
const UpdateTodos: React.FC<PropsTodosChild> = ({
  onClose,
  visible,
  valueRow,
  handleUpdate,
}) => {
  return (
    <Drawer
      title="Update Todos"
      placement="right"
      width={500}
      onClose={onClose}
      visible={visible}
    >
      <div className={styles['update__parent-todos']}>
        {/* Render the obj users click checkbox */}
        {valueRow && valueRow.length > 0
          ? valueRow.map((values, index) => {
              // if according to the key of obj, after obj there are 10 properties but only want to update 5 properties, then use this way
              const obj = Object.keys(values)
              return (
                <div className={styles['update-todos']}>
                  {obj.map((valuesObj) => {
                    if (valuesObj === 'content') {
                      const InputElement = (
                        <Input
                          defaultValue={values.content}
                          onChange={(e) =>
                            (valueRow[index].content = e.target.value)
                          }
                          placeholder="Input content"
                        />
                      )
                      return (
                        <div className={styles['update__item-todos']}>
                          <div style={{ margin: '1rem 0 0.25rem 0' }}>
                            Content
                            <b style={{ color: 'red', marginLeft: '0.25rem' }}>
                              *
                            </b>
                          </div>
                          <div>{InputElement}</div>
                        </div>
                      )
                    }
                    if (valuesObj === 'user_id') {
                      const InputElement = (
                        <Input
                          defaultValue={values.user_id}
                          onChange={(e) =>
                            (valueRow[index].user_id = e.target.value)
                          }
                          placeholder="Input user id"
                        />
                      )
                      return (
                        <div className={styles['update__item-todos']}>
                          <div style={{ margin: '1rem 0 0.25rem 0' }}>
                            UserID
                            <b style={{ color: 'red', marginLeft: '0.25rem' }}>
                              *
                            </b>
                          </div>
                          <div>{InputElement}</div>
                        </div>
                      )
                    }
                    if (valuesObj === 'created_date') {
                      const InputElement = (
                        <Input
                          disabled
                          defaultValue={values.created_date}
                          onChange={(e) =>
                            (valueRow[index].created_date = e.target.value)
                          }
                          placeholder="Input created date"
                        />
                      )
                      return (
                        <div className={styles['update__item-todos']}>
                          <div style={{ margin: '1rem 0 0.25rem 0' }}>
                            Created Date
                            <b style={{ color: 'red', marginLeft: '0.25rem' }}>
                              *
                            </b>
                          </div>
                          <div>{InputElement}</div>
                        </div>
                      )
                    }
                    if (valuesObj === 'status') {
                      const InputElement = (
                        <Input
                          disabled
                          defaultValue={values.status}
                          onChange={(e) =>
                            (valueRow[index].status = e.target.value)
                          }
                          placeholder="Input status"
                        />
                      )
                      return (
                        <div className={styles['update__item-todos']}>
                          <div style={{ margin: '1rem 0 0.25rem 0' }}>
                            Status
                            <b style={{ color: 'red', marginLeft: '0.25rem' }}>
                              *
                            </b>
                          </div>
                          <div>{InputElement}</div>
                        </div>
                      )
                    }
                  })}
                </div>
              )
            })
          : ''}
        <div className={styles['confirm']}>
          <Button
            onClick={handleUpdate}
            style={{ width: '10rem', height: '2.5rem' }}
            type="primary"
          >
            Update Confirm
          </Button>
        </div>
      </div>
    </Drawer>
  )
}
export default UpdateTodos
