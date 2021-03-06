import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Input, Button, Icon } from 'antd'

import ResponseObject from './ResponseObject'
import ResponseArray from './ResponseArray'

const APITree = ({
  prefix,
  api,
  routes,
  configurations,
  insertData,
  insertParam,
  handleChange,
  handleInsertChange,
  deleteParam,
  insertResponseData
}) => {
  const [hide, setHide] = useState(false)

  let start = prefix.split('.')
  const end = start.pop()
  start = start.join('.')
  return <div style={{marginBottom: '0.5rem'}}>
    <div>
      <NavLink to="#" onClick={() => setHide(!hide)} style={{color: '#13c2c2'}}>
        <Icon className={`${hide ? 'rotate-90' : ''}`} type="right" theme="outlined" style={{transition: 'transform 0.2s'}} />
        {api}
      </NavLink>
      <Button type="link" onClick={event => deleteParam(event, prefix, api)} style={{color: '#f5222d'}}>Delete API</Button>
    </div>
    <div style={{marginLeft: '1rem', paddingLeft: '0.5rem', borderLeft: '1px solid #1890ff', display: hide ? 'none' : 'block'}}>
      <label htmlFor={`${prefix}.${api}.status`}>status: </label>
      <Input
        id={`${prefix}.${api}.status`}
        data-key={`${prefix}.${api}.status`}
        data-variant={configurations.status.variant}
        value={routes.status}
        onChange={handleChange}
      />
      <br />
      <label>Response Data Type:</label>
      <Button
        type="link"
        onClick={
          event => {
            insertResponseData(event, start, end, api, 'object')
          }
        }
        disabled={!Array.isArray(routes.data) && typeof routes.data === 'object'}
      >
        Object
      </Button>
      <Button
        type="link"
        onClick={
          event => {
            insertResponseData(event, start, end, api, 'array')
          }
        }
        disabled={Array.isArray(routes.data)}
      >
        Array
      </Button>
      {
        Array.isArray(routes.data) ?
        <ResponseArray
          prefix={`${prefix}.${api}`}
          api='data'
          routes={routes.data}
          configurations={configurations.data}
          insertData={insertData}
          insertParam={insertParam}
          handleChange={handleChange}
          handleInsertChange={handleInsertChange}
          deleteParam={deleteParam}
        /> :
        <ResponseObject
          prefix={`${prefix}.${api}`}
          api='data'
          routes={routes.data}
          configurations={configurations.data}
          insertData={insertData}
          insertParam={insertParam}
          handleChange={handleChange}
          handleInsertChange={handleInsertChange}
          deleteParam={deleteParam}
        />
      }
    </div>
  </div>
}

export default APITree
