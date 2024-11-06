# 📦 Déploiement de PostgreSQL et d'une Application Web Node.js sur Kubernetes

Bienvenue dans ce projet ! Nous allons configurer un environnement Kubernetes local pour déployer une base de données **PostgreSQL** et une application web **Node.js**. Suivez les étapes détaillées ci-dessous pour mettre en place un cluster Kubernetes local, configurer les services et accéder à l'application.

---

## 🌐 Table des Matières

1. [Introduction](#introduction)
2. [Prérequis](#prérequis)
3. [Étapes de Déploiement](#étapes-de-déploiement)
4. [Tests et Vérifications](#tests-et-vérifications)
5. [Mise à Jour de l'Application](#mise-à-jour-de-lapplication)
6. [Accéder aux Pods et Services](#accéder-aux-pods-et-services)
7. [Contributeurs](#contributeurs)

---

## 📝 Introduction

Ce projet détaille le processus pour déployer un environnement Kubernetes avec :

- **PostgreSQL** : pour gérer la base de données de manière fiable.
- **Application Web Node.js** : pour exposer des services web.

Nous utiliserons **Minikube** pour simuler un cluster Kubernetes local.

---

## 🛠 Prérequis

Avant de commencer, assurez-vous d’avoir installé les outils suivants :

- **Minikube** : pour créer un environnement Kubernetes local.
- **kubectl** : pour interagir avec le cluster Kubernetes.
- **Docker** : pour créer et déployer des images d’application.

---

## 🚀 Étapes de Déploiement

### 1. 📥 Installation de Minikube et kubectl

#### ➡️ Installer Minikube

curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

#### ➡️ Installer kubectl

curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

#### ➡️ Démarrer Minikube

minikube start

### 2. 📂 Déploiement de PostgreSQL

#### Créer les fichiers de configuration YAML pour PostgreSQL :

postgres-deployment.yaml
postgres-service.yaml

#### Appliquer les fichiers YAML :

kubectl apply -f postgres-deployment.yaml
kubectl apply -f postgres-service.yaml

### 🔍 Tester les Pods et Services PostgreSQL

Vérifiez que les pods et services PostgreSQL sont en cours d'exécution :

kubectl get pods
kubectl get services

### 🖥 Déploiement de l'Application Web Node.js

#### Créer un Dockerfile pour l’application Node.js.

#### Construire et pousser l’image Docker :

docker build -t votre-utilisateur/docker-image:latest .
docker push votre-utilisateur/docker-image:latest

#### Créer les fichiers YAML pour l’application :

nodejs-deployment.yaml
nodejs-service.yaml

#### Appliquer les fichiers YAML pour le déploiement Node.js :

kubectl apply -f nodejs-deployment.yaml
kubectl apply -f nodejs-service.yaml

### 🔍 Tester les Pods et Services de l'Application Node.js

Vérifiez que les pods et services Node.js sont en cours d'exécution :

kubectl get pods
kubectl get services

### 🌐 Accéder à l'Application Web

#### Obtenez l'IP du nœud Minikube :

minikube ip

#### Obtenez le port NodePort du service Node.js :

kubectl get services

#### Accédez à l'application web :

http://<NodeIP>:<NodePort>

### 🔄 Mise à Jour de l'Application

Si vous apportez des modifications au fichier app.js, suivez ces étapes pour redéployer l'application :

#### Reconstruire l'image Docker :

docker build --no-cache -t bastimagic/devops:latest .

#### Pousser l'image Docker mise à jour vers Docker Hub :

docker push bastimagic/devops:latest

#### Supprimer le pod existant pour forcer le redéploiement :

kubectl delete pod <nodejs-pod-name>

#### Utilisez kubectl port-forward pour accéder à l'application :

kubectl port-forward svc/nodejs-service 3000:3000

#### Testez la connexion à l'application :

curl -X POST http://localhost:3000/items -H "Content-Type: application/json" -d '{"name": "Item 1", "description": "Description for Item 1"}'

### 9. acceder kubect pod

kubectl exec -it <postgres-pod-name> -- /bin/bash

### 📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

J'espère que ce README te plaît !
