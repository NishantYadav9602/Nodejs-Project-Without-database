pipeline {
    agent any

    environment {
        IMAGE_NAME = "my-node-app"
        KUBE_NAMESPACE = "default"
        DOCKER_USERNAME = "nishantyadav27"
        KUBECONFIG = "/var/lib/jenkins/.kube/config"  // Kubeconfig path for Jenkins user
    }

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/NishantYadav9602/Nodejs-Project-Without-database.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Set Minikube Docker Env') {
            steps {
                script {
                    // Use Minikube's Docker daemon to build the image
                    sh 'eval $(minikube -p minikube docker-env)'
                }
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
                    sh "kubectl apply -f node-app.yaml --namespace=${KUBE_NAMESPACE} --validate=false"
                    sh "kubectl rollout status deployment/node-app-deployment --namespace=${KUBE_NAMESPACE}"
                }
            }
        }
    }
}

