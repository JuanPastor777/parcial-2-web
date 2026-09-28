from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import Task
from .serializers import TaskSerializer


class TaskViewSet(ModelViewSet):
  queryset = Task.objects.all().order_by('fechaEntrega')
  serializer_class = TaskSerializer

  def get_queryset(self):
    queryset = super().get_queryset()
    estado_param = self.request.query_params.get('status')
    if estado_param:
      queryset = queryset.filter(estado=estado_param)
    return queryset

  @action(detail=True, methods=['patch'])
  def complete(self, request, pk=None):
    task = self.get_object()
    task.estado = 'completada'
    task.save()
    serializer = self.get_serializer(task)
    return Response(serializer.data, status=status.HTTP_200_OK)