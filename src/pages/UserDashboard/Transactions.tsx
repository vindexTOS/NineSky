import React, { useEffect, useState } from 'react';
import TransactionsTable from '../../components/transactions/TransactionsTable';
import TablesLoading from '../../components/skeletons/TablesLoading';



export default function Transactions() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])
  if (loading) {
    return <TablesLoading />
  }
  return (
    <TransactionsTable />
  );

}