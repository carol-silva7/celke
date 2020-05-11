import React from 'react';
import axios from 'axios';
import Head from 'next/head';

const Home = (data) => ( 
    <div>
        <Head>
            <title>Home - Celke</title>
            <meta name='robots' content='index, follow' />
            <meta name='description' content='Site de ... sobre ....' />
        </Head>
        <h1>Listar usuários</h1>
        <ul>
            {data.response.map(usuario => (
                <li key={usuario._id}>
                    Nome: {usuario.nome}<br />
                    E-mail: {usuario.email}<br /><hr />
                </li>
            ))}
        </ul>
    </div>
);

Home.getInitialProps = async () => {
    var response = await axios.get(
        'http://localhost:8080/usuarios'
    );
    //console.log(response.data);
    return {response: response.data}
};

export default Home;