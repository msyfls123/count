import React, { FunctionComponent, useState } from 'react'
import styles from './Table.module.css'

type TableProps = {
  list: string[]
  chatRecords: [string, string][]
}

function hasKeyword(list: string[], name: string) {
  return list.some((author) => author.includes(name))
}

const Table: FunctionComponent<TableProps> = ({
  list,
  chatRecords,
}) => {
  const [keyword, setKeyword] = useState('坏人')
  const hasKeywordAuthorList = chatRecords.reduce((acc, [author, record]) => {
    if (record.includes(keyword)) {
      acc.push(author)
    }
    return acc
  }, [] as string[])
  return <>
    <div className={styles.text}>
      关键词：<input value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
    </div>
    <div className={styles.table}>
      <ol className={styles.title}>
        {list.map((name) => (
          <li key={name} className={styles.line}>
            <span className={`${styles.key} ${hasKeyword(hasKeywordAuthorList, name) ? styles.highlight : ''}`}>{name}</span>
          </li>
        ))}
      </ol>
      <div className={styles.bodyContainer}>
        <ol className={styles.body}>
          {list.map((name) => (
            <li key={name} className={styles.line}>
              {chatRecords.filter(([author]) => author.includes(name)).map((record) => (
                <span className={`${styles.recordText} ${record[1].includes(keyword) ? styles.highlight : ''}`} key={record[1]}>{record[1]}</span>
              ))}
            </li>
          ))}
        </ol>
      </div>
    </div>
  </>
}

export default Table