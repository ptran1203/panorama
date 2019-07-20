## utils processing
import cv2
import numpy as np
EXTRACTOR = cv2.xfeatures2d.SIFT_create()
MATCHER = cv2.BFMatcher()
THRESHOLD = 0.85
MIN_MATCHES = 10

def show(img, name):
    # cv2.namedWindow(name,cv2.WINDOW_NORMAL)
    # cv2.resizeWindow(name, 400,800)
    cv2.imshow(name, img)
    cv2.waitKey(0)
    cv2.destroyWindow(name)

def gray(img):
    """
    Convert image to gray scale the correct way
    """
    if img is None:
        return img
    img = img.astype('uint8')
    return cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

def extract_feature(img):
    """
    Extract feature for given image,
    input: image
    return: (feature, descriptor)
    """
    # img = gray(img)
    return EXTRACTOR.detectAndCompute(img, None)
    kps = EXTRACTOR.detect(img)
    return EXTRACTOR.compute(img, kps)


def match_feature(dsc1, dsc2):
    """
    Match two given descriptors
    re: 
    """
    matches = MATCHER.knnMatch(dsc1, dsc2, k=2)
    good_points = []
    # good_matches=[]
    for m1, m2 in matches:
        if m1.distance < 0.85 * m2.distance:
            good_points.append((m1.trainIdx, m1.queryIdx))
            # good_matches.append([m1])
    # img3 = cv2.drawMatchesKnn(img1, kp1, img2, kp2, good_matches, None, flags=2)
    # cv2.imwrite('matching.jpg', img3)
    return good_points

def homography(good_points, kp1, kp2):
    if len(good_points) <= MIN_MATCHES:
        return None
    
    image1_kp = np.float32(
        [kp1[i].pt for (_, i) in good_points]
    )
    image2_kp = np.float32(
        [kp2[i].pt for (i, _) in good_points]
    )
    H, status = cv2.findHomography(image2_kp, image1_kp, cv2.RANSAC,5.0)
    return H

