# Usar Nginx en su versión Alpine (ligera) como imagen base
FROM nginx:alpine

# Copiar el archivo index.html al directorio por defecto de Nginx
COPY index.html /usr/share/nginx/html/index.html

# Cambiar el puerto por defecto de nginx de 80 a 8080
# Esto es necesario porque en OpenShift los contenedores no suelen correr como root
# y los puertos < 1024 requieren permisos de root.
RUN sed -i 's/listen  *80;/listen 8080;/g' /etc/nginx/conf.d/default.conf

# OpenShift ejecuta contenedores con un usuario aleatorio, no root.
# Por lo tanto, debemos dar permisos a los directorios donde Nginx escribe temporalmente.
RUN mkdir -p /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R 777 /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html

# Exponer el puerto 8080
EXPOSE 8080
