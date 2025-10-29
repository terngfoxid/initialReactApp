pipeline {
    agent any
    tools {
        nodejs 'NodeJS v24.10.0 (LTS)' 
    }

    stages {
        stage('Checkout') {
            steps {
                withCredentials([string(credentialsId: 'GitHubPATReact', variable: 'GIT_PAT')]) {
                    git url: "https://${GIT_PAT}@github.com/terngfoxid/initialReactApp.git", branch: 'main'
                }
            }
        }
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Deploy') {
            steps {
                sh '''
                    echo "Building Docker image..."
                    docker build -t my-react-app .

                    echo "Running container..."
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