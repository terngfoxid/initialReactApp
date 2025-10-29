pipeline {
    agent any
    tools {
        nodejs 'NodeJS v24.10.0 (LTS)' 
        sonarScanner 'SonarQube Scanner 7.2.0.5079'
    }

    environment {
        SONARQUBE_ENV = 'SonarQubeServer' 
    }

    stages {
        stage('Checkout') {
            steps {
                withCredentials([string(credentialsId: 'GitHubPATReact', variable: 'GIT_PAT')]) {
                    git url: "https://${GIT_PAT}@github.com/terngfoxid/initialReactApp.git", branch: 'main'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv("${SONARQUBE_ENV}") {
                    sh '''
                        echo "Running SonarQube Analysis..."
                        sonar-scanner \
                            -Dsonar.projectKey=my-react-app \
                            -Dsonar.sources=src \
                            -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                            -Dsonar.host.url=$SONAR_HOST_URL \
                            -Dsonar.login=$SONAR_AUTH_TOKEN
                    '''
                }
            }
        }

        stage('Build') {
            steps {
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