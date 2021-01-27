package com.example.demo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "ITEM")
public class Item {

	@Id
	@Column(name = "ID", nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "NAME", nullable = false)
	private String name;

	@Column(name = "DESCRIPTION")
	private String description;

	@Column(name = "PRICE", nullable = false)
	private double price;
	
	@Transient
	private String base64Str;
	
	@Column(name = "IMG_BASE64",length = 100000)
	private byte[] picbyte;

	public Item() {
	}
	
	public Item(String name, String description, double price, String photo, byte[] picByte) {
		this.name = name;
		this.description = description;
		this.price = price;
		this.base64Str = photo;
		this.picbyte = picByte;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}

	public String getBase64Str() {
		return base64Str;
	}

	public void setBase64Str(String base64Str) {
		this.base64Str = base64Str;
	}

	public byte[] getPicByte() {
		return picbyte;
	}

	public void setPicByte(byte[] picByte) {
		this.picbyte = picByte;
	}
	
}
