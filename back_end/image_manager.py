from PIL import Image


def convert_to_webp(image_path):
    with Image.open(image_path) as img:
        # Calculer le nouveau ratio tout en maintenant le ratio d'aspect
        ratio = min(300 / img.width, 300 / img.height)
        new_size = (int(img.width * ratio), int(img.height * ratio))

        # Redimensionner l'image
        resized_img = img.resize(new_size, Image.ANTIALIAS)

        # Convertir en WebP
        webp_path = image_path.rsplit('.', 1)[0] + '.webp'
        resized_img.save(webp_path, format='webp')


# Utiliser la fonction pour convertir une image
convert_to_webp('chemin/vers/votre/image.jpg')
