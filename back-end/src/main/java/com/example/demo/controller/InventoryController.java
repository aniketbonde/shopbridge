package com.example.demo.controller;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Item;
import com.example.demo.repository.InventoryRepo;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/api")
public class InventoryController {

	@Autowired
	InventoryRepo repo;

	@GetMapping(path = "/findAll")
	public ResponseEntity<List<Item>> getAllItems(){
		try {
			List<Item> findAll = repo.findAll();
			return findAll.isEmpty() ? new ResponseEntity<>(HttpStatus.NO_CONTENT) : new ResponseEntity<List<Item>>(findAll, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping(path = "/find/{id}")
	public ResponseEntity<List<Item>> getItemById(@PathVariable(name = "id", required = true) long id){
		try {
			if(id != 0) {
				Optional<Item> findById = repo.findById(id);
				String str = new String(findById.get().getPicByte(), StandardCharsets.UTF_8);
				findById.get().setBase64Str(str);
				/*
				 * byte[] decodedString =
				 * Base64.getDecoder().decode(findById.get().getPicByte()); String string = new
				 * String(decodedString); System.out.println(string);
				 * findById.get().setBase64Str(string); findById.get().setPicByte(null);
				 */
				return findById.isPresent() ? new ResponseEntity<List<Item>>(Arrays.asList(findById.get()), HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}else {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping(path = "/store")
	public ResponseEntity<List<Item>> storeItem(@RequestBody Item item){
		/*
		 * byte[] name = Base64.getEncoder().encode(item.getBase64Str().getBytes());
		 * System.out.println(name.length); item.setPicByte(name);
		 */
		item.setPicByte(item.getBase64Str().getBytes(StandardCharsets.UTF_8));
		
		if(null != item)
			repo.save(item);
		else
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		return getAllItems();
	}

	@DeleteMapping(path = "/item/{id}")
	public ResponseEntity deleteItemById(@PathVariable(name = "id", required = true) long id){
		try {
			if(id != 0) {
				repo.deleteById(id);
				return new ResponseEntity<>(HttpStatus.OK);
			}else {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
