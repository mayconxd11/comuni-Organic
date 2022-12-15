import React, { ChangeEvent, useEffect, useState } from 'react';
import { Grid, Typography, Button, TextField } from '@material-ui/core';
import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './CadastrarUsuario.css';
import { cadastroUsuario } from '../../services/Service';
import UsuarioCadastro from '../../models/UsuarioCadastro';
import { toast } from 'react-toastify';

function CadastrarUsuario() {

  let navigate = useNavigate();
  const [confirmarSenha, setConfirmarSenha] = useState<string>("");
  const [usuarioCadastro, setUsuarioCadastro] = useState<UsuarioCadastro>(
    {
      id: 0,
      nome: '',
      usuario: '',
      senha: '',
      foto: ''
    }
  )

  const [usuarioResult, setUsuarioResult] = useState<UsuarioCadastro>(
    {
      id: 0,
      nome: '',
      usuario: '',
      senha: '',
      foto: '',
    }
  )

  useEffect(() => {
    if(usuarioResult.id != 0){
      navigate('/login')
    }
  }, [usuarioResult])

  function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>){
    setConfirmarSenha(e.target.value)
  }

  function updateModel(e: ChangeEvent<HTMLInputElement>){
    setUsuarioCadastro({
      ...usuarioCadastro,
      [e.target.name]: e.target.value
    })
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>){
    e.preventDefault();

    if(confirmarSenha == usuarioCadastro.senha && (confirmarSenha.length && usuarioCadastro.senha.length >= 8 ) 
      && usuarioCadastro.usuario.includes('@')){
      cadastroUsuario(`/usuarios/cadastrar`, usuarioCadastro, setUsuarioResult)
      toast.success('Usuário cadastrado com sucesso', {
				position: 'top-right', // position? topo direitausuario
				autoClose: 2000, // Fechar automaticamente? após 2 segundos
				hideProgressBar: false, // não mostrar o progresso? mostrar
				closeOnClick: true, // fechar após o click? sim
				pauseOnHover: false, // pausar quando o usuário mover o mouse? não
				draggable: false, // permitir mover a notificação do local? não
				theme: 'light', // tema? light
				progress: undefined // 
			});
    }
    else{
      toast.error('Dados inconsistentes. Favor verificar as informações de cadastro', {
        position: 'top-right', // position? topo direita
        autoClose: 2000, // Fechar automaticamente? após 2 segundos
        hideProgressBar: false, // não mostrar o progresso? mostrar
        closeOnClick: true, // fechar após o click? sim
        pauseOnHover: false, // pausar quando o usuário mover o mouse? não
        draggable: false, // permitir mover a notificação do local? não
        theme: 'light', // tema? light
        progress: undefined // 
      });
    }
  }

  return (
    <Grid container direction='row' justifyContent='center' className='alignItems-center2'>
      <Grid item xs={12} sm={9} md={6} className='alignItems-center2'>
        <Box paddingX={10}>
          <form onSubmit={onSubmit}>
            
            <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='textos2'>Cadastrar</Typography>
            
            <TextField value={usuarioCadastro.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} id='nome' label='nome' variant='outlined' name='nome' margin='normal' fullWidth required/>
            
            <TextField value={usuarioCadastro.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} id='usuario' label='usuario' variant='outlined' name='usuario' margin='normal' fullWidth required/>
            
            <TextField value={usuarioCadastro.foto} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} id='foto' label='foto' variant='outlined' name='foto' margin='normal' fullWidth/>
            
            <TextField value={usuarioCadastro.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth required/>
            
            <TextField value={confirmarSenha} onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)} id='confirmarSenha' label='confirmarSenha' variant='outlined' name='confirmarSenha' margin='normal' type='password' fullWidth required/>

            <Box marginTop={2} textAlign='center'>
              <Link to='/login' className='text-decorator-none'>
                <button className="rata">
                  <span>Cancelar</span>
                    <svg viewBox="0 0 13 10" height="10px" width="15px">
                      <path d="M1,5 L11,5"></path>
                      <polyline points="8 1 12 5 8 9"></polyline>
                    </svg>
                    </button>
              </Link>

              <button className="cata">
                 <span>cadastrar</span>
                  <svg viewBox="0 0 13 10" height="10px" width="15px">
                    <path d="M1,5 L11,5"></path>
                    <polyline points="8 1 12 5 8 9"></polyline>
                  </svg>
               </button>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}

export default CadastrarUsuario;