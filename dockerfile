# Usa una imagen base de Python
FROM python:3.10-slim

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo de requisitos
COPY requirements.txt .

# Instalar dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto del proyecto
COPY . .

# Exponer el puerto 5000
EXPOSE 5000

# Ejecutar la aplicación Flask con la opción --app
CMD ["flask", "run", "--host=0.0.0.0"]
