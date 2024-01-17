from PIL import Image
from io import BytesIO
import base64


def save_image_to_webp(user_id, image_of, image_data):
    # Créer un objet Image à partir des données de la requête
    image = Image.open(BytesIO(image_data))

    # Redimensionner l'image en conservant le ratio d'aspect
    max_size = 300, 300
    image.thumbnail(max_size, Image.Resampling.LANCZOS)

    # Définir le chemin du fichier
    file_name = f"{image_of}_image_{str(user_id)}.webp"
    file_path = f"./front_end/public/{image_of}_images/{file_name}"

    # Enregistrer l'image au format WebP
    image.save(file_path, format='webp')


def to_base64(path):
    with open("back_end/managers/mails/templates/images/logo_noir.webp", "rb") as image:
        base64_image = base64.b64encode(image.read()).decode()
    with open("back_end/managers/mails/templates/images/logo_noir.py", "w+") as image64:
        image64.write(base64_image)

to_base64("")