/**
 * @see com.sun.crypto.provider.PKCS5Padding
 */
var blockSize = 8;

/**
 * Adds the given number of padding bytes to the data input.
 * The value of the padding bytes is determined
 * by the specific padding mechanism that implements this
 * interface.
 *
 * @param in the input buffer with the data to pad
 * @param off the offset in <code>in</code> where the padding bytes
 * are appended
 * @param len the number of padding bytes to add
 *
 * @Error if <code>in</code> is too small to hold
 * the padding bytes
 */
exports.padWithLen = function (input, off, len) {
	if (input === null) {
		return;
	}

	var paddingOctet = new Buffer([len & 0xff]);
	
	for (var i = 0; i < len; i++) {
		input += paddingOctet;
	}
	
	return input;
}

/**
 * Returns the index where the padding starts.
 *
 * <p>Given a buffer with padded data, this method returns the
 * index where the padding starts.
 *
 * @param in the buffer with the padded data
 * @param off the offset in <code>in</code> where the padded data starts
 * @param len the length of the padded data
 *
 * @return the index where the padding starts, or -1 if the input is
 * not properly padded
 */
exports.unpad = function (input) {
	if (input == null) { // this can happen if input is really a padded buffer
		return 0;
	}
	
	if (!Buffer.isBuffer(input)) {
		input = new Buffer(input);
	}
	
	var len = input.length;
	var lastByte = input[len - 1];
	var padValue = lastByte & 0x0ff;
	
	if ((padValue < 0x01) || (padValue > blockSize)) {
		return -1;
	}

	var start = len - (lastByte & 0x0ff);

	for (var i = 0; i < (lastByte & 0x0ff); i++) {
		if (input[start+i] != lastByte) {
			return -1;
		}
	}
	
	return start;
}

/**
 * Determines how long the padding will be for a given input length.
 *
 * @param len the length of the data to pad
 *
 * @return the length of the padding
 */
exports.padLength = function (input) {
	if (!Buffer.isBuffer(input)) {
		input = new Buffer(input);
	}
	var paddingOctet = blockSize - input.length % blockSize;
	return paddingOctet;
}
