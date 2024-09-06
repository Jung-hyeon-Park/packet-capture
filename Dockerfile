FROM node:20

# 필수 패키지 설치
RUN apt-get update && apt-get install -y \
    build-essential \
    libpcap-dev \
    && rm -rf /var/lib/apt/lists/*

# 애플리케이션 디렉토리 생성
WORKDIR /app

# 의존성 설치
COPY package*.json ./
RUN npm install

# 애플리케이션 소스 복사
COPY . .

# TypeScript 컴파일
RUN npm run build

# 애플리케이션 실행
CMD ["npm", "start"]
