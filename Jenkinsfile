pipeline {
    agent any

    tools {
        nodejs 'NodeJS v24.10.0 (LTS)'
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
                script {
                    def scannerHome = tool 'SonarQube Scanner 7.2.0.5079'
                    withCredentials([string(credentialsId: 'SONAR_TOKEN', variable: 'SONAR_TOKEN')]) {
                        withSonarQubeEnv("${SONARQUBE_ENV}") {
                            sh """
                                echo "Running SonarQube Analysis..."
                                "${scannerHome}/bin/sonar-scanner" \
                                    -Dsonar.projectKey=my-react-app \
                                    -Dsonar.sources=src \
                                    -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                                    -Dsonar.login=${SONAR_TOKEN}
                            """
                        }
                    }
                }
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
                    def imageTag = "my-react-app:${BUILD_NUMBER}"
                    sh """
                        echo "Building Docker image..."
                        docker build -t ${imageTag} .
                        docker tag ${imageTag} my-react-app:latest
                    """
                }
            }
        }

        stage('Docker Login & Scout Scan') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'DOCKER_PAT', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    script {
                        sh """
                            echo "Logging into Docker Hub..."
                            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

                            echo "Scanning image with Docker Scout..."
                            docker scout quickview my-react-app:latest --only-severities critical,high --exit-code
                        """
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    echo "Deploying container..."
                    docker stop react-app || true
                    docker rm react-app || true
                    docker run -d --name react-app -p 4080:80 my-react-app:latest
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
