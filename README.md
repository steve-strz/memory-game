# memory-2020-introIHME
memory-2020-introIHME created by GitHub Classroom

<h2> Comment faire fonctionner le jeu de Memory </h2>
</br>
Aucune installation n'est nécessaire, il suffit d'ouvrir home.html dans le fichier 'game' afin de lancer le jeu.
</br>
<h2> Description de l'architecture </h2>
</br>
L'architecture du jeu est simple :
<ul>
  </br>
  <li> Deux pages html, celui du menu principale 'home.html' (pour les réglages et les infos) et celui du jeu 'game.html'</li>
  <li> Les styles sont stockés dans le fichier 'styles', les régles css sont repartis de façon à ce qu'elles soient utilisés seulement là ou on en a besoin</li>
  <li> Les fichiers audio sont stockés dans le fichier 'sounds'</li>
  <li> Les images/sprites eux sont stockés dans le fichier 'img'</li>
  <li> Nous avons une police d'écriture stocké dans 'fonts' </li>
  <li> Pour ce qui est des scripts (dans le fichier js), voici leur fonctionnement :</li>
  </br>
  <ul>
    <li> Card.js, Timer.js, Player.js -> Des classes d'objet que nous utilisons pendant la partie</li>  
    <li> navigation.js -> ce script nous sert à gérer la navigation entre les différents menus du jeu</li>
    <li> game_settings.js -> ce script sert à sauvegarder les paramètres d'une partie choisis par l'utilisateur</li>
    <li> game_manager.js -> ce script est le coeur du jeu, il sert à instancier les objets, à gérer les intéractions, les points, et tout ce qu'il faut pour le bon fonctionnement de la partie </li>
    <li> localStorage_controller.js -> sert de 'passerelle' entre le code et le local storage du navigateur, elle simplifie les fonctions.</li>
  </ul>
</ul>
</br>
<h2> Bilan du modèle de tâche </h2>
</br>

![alt text](https://github.com/uca-iut-introihm-s2alternance/memory-2020-introIHME/blob/master/maquettes/arbre_de_tache-modifiable.png)

</br>
Dans le cadre du projet de jeu Memory, nous avons dû réaliser un premier modèle de tâche représentant le fonctionnement de notre jeu.
Le fonctionnement de celui-ci se coupe en 3 parties principales :
<ul>
  </br>
  <li> Création d'une partie</li>
  <li> Jouabilité d'une partie</li>
  <li> Fin d'une partie</li>
</ul>
D'autres parties du projet ne sont pas représentés dans le modèle de tâche, mais sont sur la maquette visuelle.
</br>
<h3> Création d'une partie </h3>
</br>

![alt text](https://github.com/uca-iut-introihm-s2alternance/memory-2020-introIHME/blob/master/readme-ressources/creation_partie_maquette.png)
</br>

La création d'une partie est basé sur le réglage de celle-ci et sa mise en place avant de pouvoir y jouer.
Comme nous pouvons le voir, nous donnons le choix à l'utilisateur de paramétrer 3 choses :
</br>
<ul>
  <li> La difficulté (le nombre de cartes) </li>
  <li> Le nombre de joueurs </li>
  <li> Le noms des joueurs </li>
</ul>
L'utilisateur valide ensuite ses paramètres. A noter que si il valide directement les paramètres sans rien modifier, le jeu se lance avec des paramètres de base (12 cartes, 2 joueurs). Le système se charge ensuite de mettre à disposition de l'utilisateur le jeu : 
</br>
</br>
<ul>
  <li> Le mélange des cartes </li>
  <li> Etaler les cartes sur la table </li>
  <li> Définir ordre de tour des joueurs</li>
</ul>
En dernière action nous avons "définir ordre de tour des joueurs". Celle-ci pourrait porter à confusion dans le sens ou l'ordre pourrait être aléatoire, or l'ordre des joueurs n'est pas aléatoire : nous commencerons toujours dans l'ordre 1,2,3,etc.. .
</br>
<h3> Jouabilité d'une partie </h3>
</br>

![alt text](https://github.com/uca-iut-introihm-s2alternance/memory-2020-introIHME/blob/master/readme-ressources/jouabilite_partie_maquette.png)

</br>
Cette partie est la plus complexe des trois, elle y représente le coeur du jeu. Plusieurs scénarios sont possibles :
</br>
</br>
<ul>
  <li> L'utilisateur débute le tour en tant que joueur : il choisit 2 cartes -> cartes différentes -> passe son tour</li>
  <li> L'utilisateur débute le tour en tant que joueur : il choisit 2 cartes -> cartes similaires -> recommence un tour et gagne des points</li>
  <li> L'utilisateur débute le tour en tant que observateur : il ne fait rien. </li>
  <li> Si il n'y a plus de cartes : le jeu se termine. </li>
</ul>
</br>

<h3> Fin d'une partie </h3>
</br>

![alt text](https://github.com/uca-iut-introihm-s2alternance/memory-2020-introIHME/blob/master/readme-ressources/fin_partie_maquette.png)

</br>
Lorsqu'il n'y a plus de cartes en jeu, celui-ci se termine. Le jeu compare alors les points des différents joueurs et, contrairement à ce que le modèle montre, aucun classement n'est créer : le gagnant seul est affiché. A partir d'ici, l'utilisateur peut choisir de recommencer une partie ou non.
</br>
<h2>Bilan de la maquette</h2>
</br>

![alt text](https://github.com/uca-iut-introihm-s2alternance/memory-2020-introIHME/blob/master/maquettes/maquette.png)

</br>
La maquette du jeu à bien été respecté dans l'ensemble à quelques exceptions :
<ul>
  <li> Le classement du jeu, qui au final n'affiche seulement le gagnant.</li>
  <li> Le menu "settings" et "about us" n'étaient pas totalement terminés car nous ne savions pas encore quoi mettre à ce moment-là.</li>
  <li> Le répartissement des cartes sur le plateau de jeu n'était que figurative : l'emplacement des cartes forme un carré géant. </li>
  <li> Le nombre de cartes est passé de 20 à 21 (dos de carte y compris) pour pouvoir disposer 40 cartes quand l'utilisateur choisit la difficulté "20". </li>
</ul>
