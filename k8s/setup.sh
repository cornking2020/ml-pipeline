#!/usr/bin/env bash

sudo apt install curl kde-standard

sudo snap install microk8s --classic

sudo usermod -a -G microk8s "$USER"
sudo chown -f -R "$USER" ~/.kube

# sudo reboot

microk8s enable dns dashboard ingress minio community registry hostpath-storage

# curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/arm64/kubectl"

# sudo install kubectl /usr/local/bin/kubectl
