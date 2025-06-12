pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/yashparmar25/Music.git'
        BRANCH = 'main'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: "${BRANCH}", url: "${REPO_URL}"
            }
        }

        stage('Inject DB URL and Run Docker Compose') {
            steps {
              //set your database url in credential than use otherwise got error
                withCredentials([string(credentialsId: 'DATABASE_URL', variable: 'DB_URL')]) {
                    sh '''
                        echo "Creating .env file for Docker Compose..."
                        echo "DATABASE_URL=$DB_URL" > .env
                        
                        echo "Starting Docker Compose..."
                        export COMPOSE_HTTP_TIMEOUT=300
                        docker-compose down || true
                        docker-compose up -d --build
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "Deployment successful!"
        }
        failure {
            echo "Deployment failed!"
        }
    }
}
