import React from 'react'
import styles from './Loading.module.scss'
import { Spin } from "antd";
import { useSelector } from 'react-redux'

export default function Loading() {
  const loading = useSelector((state: any) => state && state.signin && state.signin.loading )
  return (
    <div
      className={styles['loading-container']}
      style={{
        display: loading ? 'flex' : 'none'
      }}
    >
      <Spin size="large" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', }} />
    </div>
  )
}
