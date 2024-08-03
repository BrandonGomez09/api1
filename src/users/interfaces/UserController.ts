import { Request, Response } from 'express';
import * as UserService from '../application/UserService';
import { User } from '../domain/User';

export const registerUser = (req: Request, res: Response) => {
  const newUser: User = req.body;

  UserService.registerUser(newUser, (error, results) => {
    if (error) {
      console.error('Error al registrar usuario:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  });
};

export const loginUser = (req: Request, res: Response) => {
  const { username } = req.body;

  UserService.loginUser(username, (error, results) => {
    if (error) {
      console.error('Error al hacer login:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json({ user: results[0] });
  });
};
