
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Getting source code from GitHub'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build and Validate') {
            steps {
                sh 'node --check server.js'
                echo 'JavaScript syntax check passed'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    npx pm2 delete calculator-api || true
                    npx pm2 start server.js --name calculator-api
                '''
            }
        }

        stage('Smoke Test') {
            steps {
                sh '''
                    sleep 2
                    curl -fsS http://127.0.0.1:3000/
                    curl -fsS "http://127.0.0.1:3000/add?a=10&b=5"
                '''
            }
        }
    }
}
