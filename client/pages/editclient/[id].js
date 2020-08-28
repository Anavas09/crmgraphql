import React from 'react';
import { useRouter } from 'next/router';

function EditClient() {
  
  //Next Routing
  const router = useRouter();

  //Get the ID from router query
  const { query } = router;
  console.log(query);

  return <h1>Hache uno</h1>;
}

export default EditClient;