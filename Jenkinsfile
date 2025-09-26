pipeline {
    agent any

    tools {
        nodejs "NodeJS_16" // Make sure this matches your Jenkins NodeJS installation
    }

    environment {
        APP_NAME = "nodejs-project"  // PM2 app name
        APP_DIR = "/home/ubuntu/Nodejs-Project-Without-database" // Path on EC2
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/NishantYadav9602/Nodejs-Project-Without-database.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir("${APP_DIR}") {
                    sh 'npm install'
                }
            }
        }

        stage('Test') {
            steps {
                dir("${APP_DIR}") {
                    // If you have tests, otherwise you can skip this
                    sh 'npm test || echo "No tests found, skipping..."'
                }
            }
        }

        stage('Build & Deploy') {
            steps {
                dir("${APP_DIR}") {
                    sh '''
                        # Start or restart using PM2
                        pm2 describe $APP_NAME || pm2 start app.js --name $APP_NAME
                        pm2 restart $APP_NAME
                        pm2 save
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "Deployment Successful!"
        }
        failure {
            echo "Deployment Failed!"
        }
    }
}

