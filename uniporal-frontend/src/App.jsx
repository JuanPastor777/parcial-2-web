import React, { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Conectar con la API de Django en el puerto 8000
  const fetchTasks = () => {
    fetch('http://127.0.0.1:8000/api/tasks/?status=pendiente')
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al conectar con Django:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Marcar tarea como completada
  const handleComplete = (id) => {
    fetch(`http://127.0.0.1:8000/api/tasks/${id}/complete/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          setTasks(tasks.filter((task) => task.id !== id));
        }
      })
      .catch((err) => console.error('Error al completar tarea:', err));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex font-sans">
      
      {/* Barra lateral */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 p-6 hidden md:flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-indigo-600 p-2 rounded-xl font-bold text-white">UP</div>
            <span className="text-xl font-bold tracking-wide">UniPortal</span>
          </div>
          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-indigo-600 text-white rounded-xl font-medium shadow-md shadow-indigo-600/20">Inicio</a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-900 hover:text-white rounded-xl transition">Tareas</a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-900 hover:text-white rounded-xl transition">Cursos</a>
          </nav>
        </div>
        <div className="text-xs text-slate-500">Portal del Estudiante • Ing. Sistemas</div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">¡Hola, Juan! 👋</h1>
            <p className="text-sm text-slate-400">Panel de control y actividades académicas</p>
          </div>
          <div className="flex items-center gap-3 bg-slate-800 px-4 py-2 rounded-full border border-slate-700">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-sm">JP</div>
            <span className="text-sm font-medium">Juan Pastor</span>
          </div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Tarjeta de Tareas */}
          <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/30 p-6 rounded-2xl lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-amber-400 flex items-center gap-2">
                ⚠️ {tasks.length} Tareas Pendientes
              </h2>
              <span className="text-xs bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-full font-medium">Atención requerida</span>
            </div>

            {loading ? (
              <p className="text-sm text-slate-400">Cargando actividades...</p>
            ) : tasks.length === 0 ? (
              <p className="text-sm text-emerald-400 bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">¡Excelente trabajo! No tienes tareas pendientes por ahora 🎉</p>
            ) : (
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="bg-slate-800/80 border border-slate-700/60 p-4 rounded-xl flex items-center justify-between shadow-sm">
                    <div>
                      <h3 className="font-semibold text-slate-200">{task.titulo}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Curso: <span className="text-indigo-400 font-medium">{task.curso}</span> • Entrega: {new Date(task.fechaEntrega).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleComplete(task.id)}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-lg transition shadow"
                    >
                      Completar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tarjeta de Evaluaciones */}
          <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Evaluaciones esta semana</h3>
              <p className="text-xl font-bold text-slate-100">Parcial No. 2</p>
              <p className="text-xs text-indigo-400 mt-1">Sistemas y Arquitectura</p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-700/60 text-xs text-slate-400">
              📅 Jueves, 10:00 AM
            </div>
          </div>

        </section>

      </main>
    </div>
  );
}

export default App;