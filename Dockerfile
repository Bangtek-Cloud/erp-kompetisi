# Gunakan image resmi Bun
FROM oven/bun:latest

# Set working directory
WORKDIR /app

# Copy file package.json dan bun.lockb untuk menginstal dependensi
COPY package.json bun.lockb ./

# Install Bun dependencies dan TypeScript secara global
RUN bun install && bun add typescript --global

# Copy seluruh aplikasi ke dalam container
COPY . .

# Build aplikasi TypeScript terlebih dahulu, kemudian Vite
RUN bun run build --mode production

# Expose port untuk aplikasi, biasanya Vite di port 3000, sesuaikan jika berbeda
EXPOSE 8080

# Start aplikasi menggunakan preview (jika mode produksi)
CMD ["bun", "run", "preview"]
