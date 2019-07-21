import cv2
import numpy as np
import os


import core.utils as utils
import core.constant as const
from core.descriptor import ImageDescriptor




class Panorama:
    def __init__(self, paths):
        """
        Init
        params: paths -> a list of paths for each image
        """
        self.imgs = self._generate_imgs(paths)
        self.matches = self._cal_matches()
        self.homographies = self._cal_homographies()
        self.height = self._height()
        self.width = self._width()

    @staticmethod
    def _generate_imgs(paths):
        return [
            ImageDescriptor(_) for _ in paths
        ]

    def _width(self):
        """
        Calculate width of panorama
        """
        return sum([img.shape[1] for img in self.imgs])

    def _height(self):
        """
        Calculate heigth of panorama
        """
        heigth_list = [img.shape[0] for img in self.imgs]
        min_h = min(heigth_list)
        max_h = max(heigth_list)
        return int(abs(max_h + min_h))

    def _cal_matches(self):
        """
        find matches feature for pair
        of images
        eg: matches point of img0 and img1 is matches["01"]
        """ 
        matches = {}
        pre = self.imgs[0]
        for i, img in enumerate(self.imgs[1:]):
            matches[utils.key(i)] = utils.match_feature(pre.dsc, img.dsc)
        
        return matches

    def _cal_homographies(self):
        """
        Calculate homography for pair
        of images
        eg: homography of img1 and img2 is homographies["12"]
        """
        h = {}
        for k, match in self.matches.items():
            # matches["01"] => img[0], img[1]
            img1 = self.imgs[int(k[0])]
            img2 = self.imgs[int(k[1])]
            h[k] = utils.homography(img1, img2)

        return h
    
    def _sort(self):
        res = []
        
        # for img in imgs:
    
    def stitch(self):
        size = len(self.imgs) - 1
        panorama = cv2.warpPerspective(self.imgs[size].img, 
            self.homographies[utils.key(size - 1)],
            (self.width, self.height))
        pre = self.imgs[size - 1]
        panorama[:pre.shape[0], :pre.shape[1]] = pre.img
        for i in range(size - 1, 0, -1):
            pre = self.imgs[i - 1]
            panorama = cv2.warpPerspective(panorama, 
            self.homographies[utils.key(i - 1)],
            (self.width, self.height))
            panorama[:pre.shape[0], :pre.shape[1]] = pre.img

        if const.DEBUG:
            utils.show(panorama, "result_left")

        cv2.imwrite(const.OUTPUT_DIR + "result.jpg", panorama)
        return "/static/output/result.jpg"