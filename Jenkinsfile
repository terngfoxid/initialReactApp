pipeline {
    agent any

    tools {
        nodejs 'NodeJS v24.10.0 (LTS)'
    }

    stages {
        stage('Checkout') {
            steps {
                
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh '''
                        echo "Building Docker image..."
                        docker build -t my-react-app .
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    echo "Deploying container..."
                    docker stop react-app || true
                    docker rm react-app || true
                    docker run -d --name react-app -p 4080:80 my-react-app
                '''
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}