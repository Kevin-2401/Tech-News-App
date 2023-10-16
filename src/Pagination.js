import React from 'react'
import { useGlobalContext } from './Context'

const Pagination = () => {

  const { getPrevPage, getNextPage, page, nbPages } = useGlobalContext();

  return (
    <>
      <div className='pagination-btn'>

        <button onClick={() => getPrevPage()}>PREV</button>

        <p>
          {page + 1} of {nbPages}
        </p>

        <button onClick={() => getNextPage()}>NEXT</button>

      </div>
    </>
  )
}

export default Pagination