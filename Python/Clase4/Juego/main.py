import pygame
import sys
import random
import os

from personajes import Personaje, Enemigo, Explosion
from constantes import SCREEN_WIDTH, SCREEN_HEIGHT, ASSETS_PATH


def mostrar_imagen_inicial(screen, imagen_path, duracion):
    imagen = pygame.image.load(imagen_path).convert()
    imagen = pygame.transform.scale(imagen, (SCREEN_WIDTH, SCREEN_HEIGHT))

    alpha = 255
    clock = pygame.time.Clock()

    tiempo_inicial = pygame.time.get_ticks()
    tiempo_total = duracion  # ms

    while pygame.time.get_ticks() - tiempo_inicial < tiempo_total:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

        tiempo_transcurrido = pygame.time.get_ticks() - tiempo_inicial
        alpha = 255 - int((tiempo_transcurrido / max(tiempo_total, 1)) * 255)
        if alpha < 0:
            alpha = 0

        imagen.set_alpha(int(alpha))
        screen.fill((0, 0, 0))
        screen.blit(imagen, (0, 0))
        pygame.display.flip()

        clock.tick(60)


def main():
    pygame.init()
    screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
    pygame.display.set_caption("Juego")
    clock = pygame.time.Clock()

    # imagen inicial
    imagen_inicial_path = os.path.join(ASSETS_PATH, 'images', 'inicio', 'Star.png')
    mostrar_imagen_inicial(screen, imagen_inicial_path, 3000)

    # icono
    icon = pygame.image.load(os.path.join(ASSETS_PATH, 'images', '001.jfif'))
    pygame.display.set_icon(icon)

    # fondos
    fondo2 = pygame.image.load(os.path.join(ASSETS_PATH, 'images', 'fondo2.jfif'))
    fondo2 = pygame.transform.scale(fondo2, (SCREEN_WIDTH, SCREEN_HEIGHT))

    fondo3 = pygame.image.load(os.path.join(ASSETS_PATH, 'images', 'fondo3.jpg'))
    fondo3 = pygame.transform.scale(fondo3, (SCREEN_WIDTH, SCREEN_HEIGHT))

    fondo_actual = fondo2

    # sonidos
    sonido_laser = pygame.mixer.Sound(os.path.join(ASSETS_PATH, 'sounds', 'laserdis.mp3'))
    sonido_explosion = pygame.mixer.Sound(os.path.join(ASSETS_PATH, 'sounds', 'explosion.mp3'))

    pygame.mixer.music.load(os.path.join(ASSETS_PATH, 'sounds', 'efectos.mp3'))
    pygame.mixer.music.play(-1)

    # personaje
    personaje = Personaje(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2)
    enemigos = []
    explosiones = []
    puntos = 0
    nivel = 1

    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

        keys = pygame.key.get_pressed()
        dx, dy = 0, 0

        if keys[pygame.K_LEFT]:
            dx = -5
        if keys[pygame.K_RIGHT]:
            dx = 5
        if keys[pygame.K_UP]:
            dy = -5
        if keys[pygame.K_DOWN]:
            dy = 5

        personaje.mover(dx, dy)

        if keys[pygame.K_SPACE]:
            if personaje.disparar():
                sonido_laser.play()

        # mover enemigos
        for enemigo in enemigos[:]:
            enemigo.mover()
            if enemigo.rect.top > SCREEN_HEIGHT:
                enemigos.remove(enemigo)
                personaje.recibir_dano()

        # colisiones laser-enemigo
        for enemigo in enemigos[:]:
            for laser in personaje.lasers[:]:
                if enemigo.rect.colliderect(laser.rect):
                    explosiones.append(Explosion(enemigo.rect.centerx, enemigo.rect.centery))
                    enemigos.remove(enemigo)
                    personaje.lasers.remove(laser)
                    sonido_explosion.play()
                    puntos += 10
                    break

        # colision enemigo-personaje
        for enemigo in enemigos[:]:
            if enemigo.rect.colliderect(personaje.shape):
                if not personaje.recibir_dano():
                    running = False

        # spawn random
        if random.random() < 0.02:
            x = random.randint(0, SCREEN_WIDTH - 50)
            enemigo = Enemigo(x, 0)
            enemigos.append(enemigo)

        # actualizar explosiones
        explosiones = [explosion for explosion in explosiones if explosion.actualizar()]

        # cambiar fondo por puntos
        if puntos > 0 and puntos % 250 == 0:
            if fondo_actual == fondo2:
                fondo_actual = fondo3
            else:
                fondo_actual = fondo2
                puntos += 10

        # dibujar
        screen.blit(fondo_actual, (0, 0))
        personaje.dibujar(screen)

        for enemigo in enemigos:
            enemigo.dibujar(screen)

        for explosion in explosiones:
            explosion.dibujar(screen)

        font = pygame.font.Font(None, 36)
        marcador_text = font.render(f"Puntos: {puntos}", True, (255, 255, 255))
        nivel_text = font.render(f"Nivel: {nivel}", True, (255, 255, 255))
        screen.blit(marcador_text, (10, 10))
        screen.blit(nivel_text, (10, 50))

        pygame.display.flip()
        clock.tick(60)

    # GAME OVER
    screen.fill((0, 0, 0))
    font = pygame.font.Font(None, 48)
    game_over_text = font.render("GAME OVER", True, (255, 0, 0))
    texto_final = font.render("Que la fuerza te acompañe!!", True, (255, 255, 255))

    screen.blit(game_over_text, (SCREEN_WIDTH // 2 - game_over_text.get_width() // 2, SCREEN_HEIGHT // 2 - 40))
    pygame.display.flip()
    pygame.time.wait(3000)

    for alpha in range(255, -1, -5):
        screen.fill((0, 0, 0))
        game_over_text.set_alpha(alpha)
        screen.blit(game_over_text, (SCREEN_WIDTH // 2 - game_over_text.get_width() // 2, SCREEN_HEIGHT // 2 - 40))
        pygame.display.flip()
        pygame.time.delay(10)

    screen.fill((0, 0, 0))
    screen.blit(texto_final, (SCREEN_WIDTH // 2 - texto_final.get_width() // 2, SCREEN_HEIGHT // 2))
    pygame.display.flip()
    pygame.time.wait(5000)

    pygame.quit()
    pygame.exit()


if __name__ == '__main__':
    main()