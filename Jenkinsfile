pipeline {
    agent any

    environment {
        IMAGE_NAME = "my-node-app"
        KUBE_NAMESPACE = "default"
        DOCKER_USERNAME = "nishantyadav27"
        KUBECONFIG = "/var/lib/jenkins/.kube/config"
    }

    stages {

        stage('Checkout') {
            steps {
                // Checkout specific branch 'main'
                git branch: 'main', url: 'https://github.com/NishantYadav9602/Nodejs-Project-Without-database.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${IMAGE_NAME}:latest")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh 'echo $PASSWORD | docker login -u $USERNAME --password-stdin'
                    sh "docker tag ${IMAGE_NAME}:latest ${USERNAME}/${IMAGE_NAME}:latest"
                    sh "docker push ${USERNAME}/${IMAGE_NAME}:latest"
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Apply deployment and service YAML
                    sh "kubectl apply -f node-app.yaml --namespace=${KUBE_NAMESPACE} --validate=false"

                    // Rollout status uses the correct deployment name
                    sh "kubectl rollout status deployment/node-app --namespace=${KUBE_NAMESPACE}"
                }
            }
        }
    }
}

