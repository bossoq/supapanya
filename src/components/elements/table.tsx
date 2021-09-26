import { useRouter } from 'next/router'

const Table = ({
  headers,
  datas,
}: {
  headers: string[]
  datas: Record<string, any>[]
}): JSX.Element => {
  const router = useRouter()

  return (
    <table className="table is-hoverable is-fullwidth">
      <thead className="has-text-centered">
        <tr>
          {headers.map((header: string) => {
            if (header !== 'id') {
              return <th key={header}>{header}</th>
            }
          })}
          <th>Edit?</th>
        </tr>
      </thead>
      <tbody>
        {datas.map((row: Record<string, any>, idx: number) => (
          <tr key={idx} className="has-text-centered">
            {Object.entries(row).map(([key, value], idx) => {
              if (key !== 'id' && key !== 'allowAll' && key !== 'allowList') {
                return <td key={idx}>{value}</td>
              } else if (key === 'allowAll') {
                return (
                  <td key={idx}>
                    <input type="checkbox" checked={value} disabled />
                  </td>
                )
              } else if (key === 'allowList') {
                return (
                  <td key={idx}>{value ? value.join(', ') : 'allowAll'}</td>
                )
              }
            })}
            <td>
              <button
                key={idx}
                className="button is-success is-small"
                onClick={() =>
                  router.push(
                    {
                      pathname: '/vodedit',
                      query: { ...datas[idx] },
                    },
                    '/vodedit'
                  )
                }
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
