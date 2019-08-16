<?php
class Usuarios extends Validator
{
	//Declaración de propiedades
	private $id = null;
	private $nombres = null;
	private $apellidos = null;
	private $correo = null;
	private $alias = null;
	private $contra = null;

	//Métodos para sobrecarga de propiedades
	public function setId($value)
	{
		if ($this->validateId($value)) {
			$this->id = $value;
			return true;
		} else {
			return false;
		}
	}

	public function getId()
	{
		return $this->id;
	}

	public function setNombres($value)
	{
		if ($this->validateAlphabetic($value, 1, 50)) {
			$this->nombres = $value;
			return true;
		} else {
			return false;
		}
	}
	
	public function getNombres()
	{
		return $this->nombres;
	}

	public function setApellidos($value)
	{
		if ($this->validateAlphabetic($value, 1, 50)) {
			$this->apellidos = $value;
			return true;
		} else {
			return false;
		}
	}

	public function getApellidos()
	{
		return $this->apellidos;
	}

	public function setCorreo($value)
	{
		if ($this->validateEmail($value)) {
			$this->correo = $value;
			return true;
		} else {
			return false;
		}
	}

	public function getCorreo()
	{
		return $this->correo;
	}

	public function setAlias($value)
	{
		if ($this->validateAlphanumeric($value, 1, 50)) {
			$this->alias = $value;
			return true;
		} else {
			return false;
		}
	}

	public function getAlias()
	{
		return $this->alias;
	}

	public function setContra($value)
	{
		if ($this->validatePassword($value)) {
			$this->contra = $value;
			return true;
		} else {
			return false;
		}
	}

	public function getContra()
	{
		return $this->contra;
	}

	//Métodos para manejar la sesión del usuario
	public function checkCorreo()
	{
		$sql = 'SELECT id_usuario FROM usuarios WHERE correo = ?';
		$params = array($this->correo);
		$data = Database::getRow($sql, $params);
		if ($data) {
			$this->id = $data['id_usuario'];
			return true;
		} else {
			return false;
		}
	}

	public function checkContra()
	{
		$sql = 'SELECT contra, alias_usuario FROM usuarios WHERE id_usuario = ?';
		$params = array($this->id);
		$data = Database::getRow($sql, $params);
		
		if (password_verify($this->contra, $data['contra'])) {
			$this->alias = $data['alias_usuario'];
			return true;
		} else {
			return false;
		}
	}

	public function changeContra()
	{
		$hash = password_hash($this->contra, PASSWORD_DEFAULT);
		$sql = 'UPDATE usuarios SET contra = ? WHERE id_usuario = ?';
		$params = array($hash, $this->id);
		return Database::executeRow($sql, $params);
	}

	//Metodos para manejar el CRUD
	public function readUsuarios()
	{
		$sql = 'SELECT id_usuario, nombre_usuario, apellido_usuario, alias_usuario, correo FROM usuarios ORDER BY nombre_usuario';
		$params = array(null);
		return Database::getRows($sql, $params);
	}
	public function readUsu()
	{
		$sql = 'SELECT id_usuario, nombre_usuario FROM usuarios';
		$params = array(null);
		return Database::getRows($sql, $params);
	}
	public function searchUsuarios($value)
	{
		$sql = 'SELECT id_usuario, nombre_usuario, apellido_usuario, correo, alias_usuario FROM usuarios WHERE apellido_usuario LIKE ? OR nombre_usuario LIKE ? ORDER BY apellido_usuario';
		$params = array("%$value%", "%$value%");
		return Database::getRows($sql, $params);
	}

	public function createUsuario()
	{
		$hash = password_hash($this->contra, PASSWORD_DEFAULT);
		$sql = 'INSERT INTO usuarios(nombre_usuario, apellido_usuario, correo, alias_usuario, contra, id_tipo) VALUES(?, ?, ?, ?, ?, 1)';
		$params = array($this->nombres, $this->apellidos, $this->correo, $this->alias, $hash);
		return Database::executeRow($sql, $params);
	}

	public function getUsuario()
	{
		$sql = 'SELECT id_usuario, nombre_usuario, apellido_usuario, correo, alias_usuario FROM usuarios WHERE id_usuario = ?';
		$params = array($this->id);
		return Database::getRow($sql, $params);
	}

	public function updateUsuario()
	{
		$sql = 'UPDATE usuarios SET nombre_usuario = ?, apellido_usuario = ?, correo = ?, alias_usuario = ? WHERE id_usuario = ?';
		$params = array($this->nombres, $this->apellidos, $this->correo, $this->alias, $this->id);
		return Database::executeRow($sql, $params);
	}

	public function deleteUsuario()
	{
		$sql = 'DELETE FROM usuarios WHERE id_usuario = ?';
		$params = array($this->id);
		return Database::executeRow($sql, $params);
	}

	public function ClienteReporte()
	{
		$sql = 'SELECT nombre_cliente, apellido_cliente, alias_cliente, correo FROM cliente GROUP BY id_cliente';
		$params = array(null);
		return Database::getRows($sql, $params);
	}
	//Reportes con parametros
	public function lotesxusario($value)
	{
		$sql= 'SELECT productos.nombre_producto, lotes.nom_lote, lotes.ingreso FROM lotes 
		INNER JOIN productos ON productos.id_producto= lotes.id_producto 
		INNER JOIN usuarios ON usuarios.id_usuario=lotes.id_usuario 
		WHERE usuarios.id_usuario= ?';
		$params = array($value);
		return Database::getRows($sql,$params);
	}
}
?>
