/*
	sqCollision(A, B) checks whether A and B are colliding or not.
    
    
*/

function sqCollision(A, B)
{
	/*var Ax = parseInt(getComputedStyle(A).left, 10);
	var Ay = parseInt(getComputedStyle(A).top, 10);
	var Aw = parseInt(getComputedStyle(A).width, 10);
	var Ah = parseInt(getComputedStyle(A).height, 10);
	
	var Bx = parseInt(getComputedStyle(B).left, 10);
	var By = parseInt(getComputedStyle(B).top, 10);
	var Bw = parseInt(getComputedStyle(B).width, 10);
	var Bh = parseInt(getComputedStyle(B).height, 10);*/
    
	/*
		R is to make it less sensible.
		The transparent edges made the obstacles be hit even when not touching.
		So we takes X pixels from the calculation. 
	*/
	var R = 10;
	
    var Ax = A.x + R;
	var Ay = A.y + R;
	var Aw = A.w - R;
	var Ah = A.h - R;
	
	var Bx = B.x + R;
	var By = B.y + R;
	var Bw = B.w - R;
	var Bh = B.h - R;
	
	
	if ((Bx >= Ax && Bx <= (Ax+Aw)) &&	// X collision
		(By >= Ay && By <= (Ay+Ah))) {	// Y collision
			return true;
	}
	
	else if (((Bx+Bw) >= Ax && (Bx+Bw) <= (Ax+Aw)) &&
		((By+Bh) >= Ay && (By+Bh) <= (Ay+Ah))) {
			return true;
	}
	
	else if ((Bx >= Ax && Bx <= (Ax+Aw)) &&
		((By+Bh) >= Ay && (By+Bh) <= (Ay+Ah))) {
			return true;
	}
	
	else if (((Bx+Bw) >= Ax && (Bx+Bw) <= (Ax+Aw)) &&
		(By >= Ay && By <= (Ay+Ah))) {
			return true;
	}
		
	return false;
}
