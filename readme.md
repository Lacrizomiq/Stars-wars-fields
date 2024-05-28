# Exercie Algo + Serveur

L'oncle Owen voudrait un serveur web pour connaitre l'état de ses champs... il cultive une terre arride et il faut installé des piéges à humidité pour rendre des parcelles cultivables.

Chaque champs est une grille de dimension S (composé donc de S parcelles en largeur et de S parcelles en hauteur)

Quand une parcelle contient un piége à humidité, il est représenté par un O, les parcelles vides par un X.

Un piége rend les 8 parcelles adjacentes cultivables.

## étape 1

A partir d'un tableau représentant un champs, déterminer le nombre de parcelles effectivement cultivables.

Ex :

{
name: "champsA"
size: 3
parcelles: ["X","O","X","X","X","X","O","X","X"]
}

ce champs posséde 6 parcelles cultivables.

## étape 2

Créer un server express avec 2 routes :

- `/` Affiche la liste des champs
- `/field/:nomChamps` Affiche une page dédié au champs avec son nom, le nombre de parcelles cultivable et une représentation graphique du champs (case bleue pour le piéges, case verte pour les parcelles cultivables, case jaune pour les parcelles trop arrides pour être cultivées)
