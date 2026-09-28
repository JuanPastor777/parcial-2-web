from django.db import models


class Task(models.Model):
  STATUS_CHOICES = [
      ('pendiente', 'Pendiente'),
      ('completada', 'Completada'),
  ]

  titulo = models.CharField(max_length=200)
  curso = models.CharField(max_length=100)
  fechaEntrega = models.DateTimeField()
  estado = models.CharField(
      max_length=20, choices=STATUS_CHOICES, default='pendiente'
  )

  def __str__(self):
    return f'{self.titulo} - {self.curso}'