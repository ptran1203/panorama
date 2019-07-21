import cv2

sift = cv2.xfeatures2d.SIFT_create()

class ImageDescriptor:
    def __init__(self, _input):
        """
        _input can be string(path) or matrix(img)
        """
        self.img = cv2.imread(_input) if type(_input) == str else _input
        # print(self.img, _input)
        self.kps, self.dsc = sift.detectAndCompute(self.img, None)
        self.shape = self.img.shape