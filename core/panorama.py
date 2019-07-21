import cv2
import numpy as np
import os
import utils
import constant as const
from descriptor import ImageDescriptor


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
        # print(max_h, min_h)
        return int(abs(max_h + min_h)) * 2

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
        pass
    
    def _homography_of(self, idx):
        """
        Calculate homography for given idx-th img
        between it and the first img
        eg: homography of img3 and img0(h03) equal to
        h01 dot h12 dot h23 where dot is multiplication
        of two matrix
        """
        # homography of idx-th img and it's
        # previous img
        h = self.homographies[utils.key(idx - 1)]

        # loop from idx back to 0
        for i in range(idx - 1, -1, -1):
            h = np.dot(h, self.homographies[utils.key(i)])
        
        return h
    
    def _stitch_two(self, idx):
        cur_img = self.imgs[idx]
        pre_img = self.imgs[idx - 1]
        panorama = cv2.warpPerspective(cur_img.img, 
            self.homographies[utils.key(idx - 1)],
            (self.width, self.height))
        
        panorama[:pre_img.shape[0], :pre_img.shape[1]] = pre_img.img
        return panorama

    def combine(self):
        size = len(self.imgs) - 1
        panorama = cv2.warpPerspective(self.imgs[size].img, 
            self.homographies[utils.key(size - 1)],
            (self.height, self.width))
        pre = self.imgs[size - 1]
        panorama[:pre.shape[0], :pre.shape[1]] = pre.img
        for i in range(size - 1, 0, -1):
            pre = self.imgs[i - 1]
            panorama = cv2.warpPerspective(panorama, 
            self.homographies[utils.key(i - 1)],
            (self.width, self.height))
            panorama[:pre.shape[0], :pre.shape[1]] = pre.img

        if const.DEBUG:
            utils.show(panorama, "result")

        cv2.imwrite("output/res.jpg",panorama)
        return panorama
