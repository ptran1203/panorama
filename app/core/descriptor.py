import cv2

# TODO: Is xfeatures2d working on Windows?
sift = cv2.xfeatures2d.SIFT_create()

class ImageDescriptor:
    def __init__(self, _input):
        """
        _input can be string(path) or matrix(img)
        """
        try:
            self.img = cv2.imread(_input) if type(_input) == str else _input
            # print(self.img, _input)
            self.kps, self.dsc = sift.detectAndCompute(self.img, None)
            self.shape = self.img.shape
        except cv2.error:
            print("ERROR! Consider wrong file path case", _input)