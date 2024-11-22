# 🚢 Guide de Déploiement Kubernetes : Application Web PostgreSQL, Node.js et React

## 📘 Aperçu du Projet

### Objectif Principal

Fournir un guide complet pour déployer une application web full-stack sur un cluster Kubernetes local en utilisant Minikube, comprenant :
- Une base de données PostgreSQL
- Un backend Node.js
- Un frontend React

### Objectifs Techniques

- Créer un environnement de déploiement Kubernetes reproductible
- Démontrer une architecture de microservices
- Fournir des instructions de déploiement détaillées
- Présenter les meilleures pratiques de conteneurisation et d'orchestration

## 🛠 Technologies Utilisées

- **Conteneurisation** : Docker
- **Orchestration** : Kubernetes (Minikube)
- **Backend** : Node.js
- **Base de données** : PostgreSQL
- **Frontend** : React.js

## 🔧 Prérequis

### Logiciels Requis

- **Docker** : v20.10+
- **Minikube** : v1.25+
- **kubectl** : v1.22+
- **curl** : Dernière version
- **Système d'exploitation** : Linux / macOS / Windows

### Configuration Système

- Minimum 4 cœurs CPU
- Minimum 8 Go de RAM
- 20 Go d'espace disque libre
- Connexion internet stable

## 🚀 Installation et Configuration

### Étape 1 : Installation de Minikube et kubectl

```bash
# Télécharger Minikube
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# Télécharger kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# Démarrer Minikube
minikube start
```

### Étape 2 : Gestion de la Configuration

#### ConfigMap
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: configuration-application
data:
  HOTE_BASE_DONNEES: service-postgresql
  ENVIRONNEMENT_NODE: production
  NIVEAU_LOGS: info
```

#### Secrets
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: secrets-application
type: Opaque
data:
  MOT_DE_PASSE_BASE_DONNEES: VOTRE_MOT_DE_PASSE_ENCODE_EN_BASE64
  CLE_JWT: VOTRE_CLE_JWT_ENCODEE_EN_BASE64
```

#### Application de la Configuration
```bash
kubectl apply -f configmap.yaml
kubectl apply -f secret.yaml
```

### Étape 3 : Déploiement de PostgreSQL

```bash
kubectl apply -f postgres-deployment.yaml
kubectl apply -f postgres-service.yaml
```

### Étape 4 : Déploiement du Backend Node.js

#### Dockerfile du Backend
```dockerfile
# Étape de construction
FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Étape de production
FROM node:16-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "start"]
```

#### Construction et Déploiement
```bash
docker build -t utilisateur/backend-nodejs:latest .
docker push utilisateur/backend-nodejs:latest
kubectl apply -f nodejs-deployment.yaml
```

### Étape 5 : Déploiement du Frontend React

#### Dockerfile Frontend
```dockerfile
# Étape de construction
FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Étape de production
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Construction et Déploiement
```bash
docker build -t utilisateur/frontend-react:latest .
docker push utilisateur/frontend-react:latest
kubectl apply -f frontend-deployment.yaml
```

## 🔍 Vérification et Surveillance

### Commandes de Vérification
```bash
kubectl get pods
kubectl get services
kubectl get deployments
```

## 🛡️ Considérations de Sécurité

- Utiliser des secrets Kubernetes pour les données sensibles
- Implémenter des politiques réseau
- Mettre à jour régulièrement les images de conteneurs
- Utiliser des builds multi-étapes
- Activer le contrôle d'accès RBAC

## 📊 Outils de Monitoring

- Prometheus pour les métriques
- Grafana pour la visualisation
- Stack ELK pour les logs

## 🤝 Contribution

1. Forker le dépôt
2. Créer une branche de fonctionnalité
3. Commiter les modifications
4. Pousser la branche
5. Créer une pull request

## 📄 Licence

Projet sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

**Bon déploiement ! 🚀**
