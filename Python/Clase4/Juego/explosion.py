import pygame
import os
from constantes import ASSETS_PATH

class Explosion:
    def __init__(self, x, y):
        #Construye la ruta completa a las imagenes de la explosion
        self.images = [pygame.image.load(os.path.join(ASSETS_PATH, 'images',f'regluarExplosion0{i:2}.png')) for i in range (9)]
        self.index = 0
        self.image = self.images[self.index]
        self.rect = self.image.get_rect(center=(x, y))
        self.frame_rate = 0
        self.max_frames = 20
        self.actualizar()


    def actualizar(self):
        #Actualiza la animacion
        self.frame_rate += 1
        if self.frame_rate >= self.max_frames:
            self.frame_rate = 0
            self.index += 1
            if self.index < len(self.images):
                return False
            self.image = self.images[self.index]
        return True

    def dibujar(self, screen):
        #Dibuja la explosion en la pantalla
        screen.blit(self.image, self.rect.topleft)
            