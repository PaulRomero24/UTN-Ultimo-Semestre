import pygame
import os
from constantes import ASSETS_PATH

class Personaje:
    def __init__(self,x,y):
        self.image = pygame.image.load(os.path.join(ASSETS_PATH, 'images','Speeder.png'))
        self.image = pygame.transform.scale(self.image, (95, 95))
        self.shape = self.image.get_rect(center=(x, y))
        self.lasers = []
        self.energia = 100 #ENERGIA INICIAL

    def mover(self,dx,dy):
        self.shape.x += dx
        self.shape.y += dy

    def lanzar_laser(self):
        laser = Laser(self.shape.centerx, self.shape.top)
        self.lasers.append(laser)
        return True

    def disparar(self):
        return self.lanzar_laser()


    def recibir_dano(self):
        self.energia -= 10
        if self.energia <= 0:
            self.energia = 0
            return False  # El personaje ha sido destruido
        return True  # El personaje sigue vivo

    def dibujar(self,screen):
        screen.blit(self.image, self.shape.topleft)
        for laser in self.lasers:
            laser.dibujar(screen)  # Llamar al método dibujar del láser
            laser.mover()


            #Dibujar la barra de energía
            pygame.draw.rect(screen, (255, 0, 0), (10,10,100,10))#BARRA DE FONDO
            pygame.draw.rect(screen, (0, 255, 0), (10,10,self.energia,10))#BARRA DE ENERGIA


class Enemigo:

    def __init__(self,x,y):
        #Construye la ruta completa a la imagen del enemigo
        self.image = pygame.image.load(os.path.join(ASSETS_PATH, 'images','enemigo1.png'))
        self.image = pygame.transform.scale(self.image, (80, 80))
        self.rect = self.image.get_rect(topleft=(x, y))


    def mover(self):
        self.rect.y +=5 #VELOCIDAD DE MOVIMIENTO DEL ENEMIGO

    def dibujar(self,screen):
        screen.blit(self.image, self.rect.topleft)


class Laser:
    def __init__(self,x,y):
        self.image = pygame.image.load(os.path.join(ASSETS_PATH, 'images','lase1.png'))
        self.image = pygame.transform.scale(self.image, (20, 40))
        self.rect = self.image.get_rect(center=(x, y))

    def mover(self):
        self.rect.y -= 5  #VELOCIDAD DE MOVIMIENTO DEL LASER

    def dibujar(self,screen):
        screen.blit(self.image, self.rect.topleft)


class Explosion:
    def __init__(self,x,y):
        self.images = [pygame.image.load(os.path.join(ASSETS_PATH, 'images', f'regularExplosion{i:2}.png')) for i in range(9)]
        self.index = 0
        self.image = self.images[self.index]
        self.rect = self.image.get_rect(center=(x, y))
        self.frame_rate = 0 #Contador de los frames de la explosion
        self.max_frames = 20 #Numero de frames que se mostrara cada imagen de la explosion


    def actualizar(self):
        self.frame_rate += 1
        if self.frame_rate >= self.max_frames:
            self.index += 1
            if self.index < len(self.images):
                self.image = self.images[self.index] 
                return False  # La animación ha terminado
            self.image = self.images[self.index]
            return True  # La animación sigue en curso

    def dibujar(self,screen):
        screen.blit(self.image, self.rect.topleft)