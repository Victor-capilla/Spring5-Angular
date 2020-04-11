package com.example.springbootbackendapirest.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.springbootbackendapirest.models.dao.IClienteDao;
import com.example.springbootbackendapirest.models.entity.Cliente;

@Service
public class ClienteServiceImpl implements IClienteService{
	
	@Autowired
	private IClienteDao clienteDao;
	@Override
	@Transactional(readOnly = true)
	public List<Cliente> findAll() {
		// TODO Auto-generated method stub
		return (List<Cliente>)clienteDao.findAll();
	}
	@Override
	public Cliente findByID(Long id) {
		// TODO Auto-generated method stub
		return clienteDao.findById(id).orElse(null);
	}
	@Override
	public Cliente save(Cliente cliente) {
		// TODO Auto-generated method stub
		return clienteDao.save(cliente);
	}
	@Override
	public List<Cliente> saveAll(List<Cliente> clientes) {
		// TODO Auto-generated method stub
		return (List<Cliente>) clienteDao.saveAll(clientes);
	}

	@Override
	public void deleteAll(List<Cliente> clientes) {
		// TODO Auto-generated method stub
		clienteDao.deleteAll(clientes);
	}
	@Override
	public void delete(Long id) {
		clienteDao.deleteById(id);
		
	}

}
