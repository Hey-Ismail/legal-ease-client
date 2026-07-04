function normalizeEmail(email) {
    return String(email || "").trim().toLowerCase();
}

function normalizeId(id) {
    return String(id || "").trim();
}

const hiringRecords = [];
const comments = [];
let hireSequence = 1;
let commentSequence = 1;

export function addHiringRecord(record) {
    const userEmail = normalizeEmail(record?.userEmail);
    const lawyerId = normalizeId(record?.lawyerId);

    if (!userEmail || !lawyerId) {
        return null;
    }

    const existing = hiringRecords.find(
        (item) => item.userEmail === userEmail && item.lawyerId === lawyerId
    );

    if (existing) {
        return existing;
    }

    const nextRecord = {
        id: `hire-${hireSequence++}`,
        userEmail,
        userName: String(record?.userName || "Guest User").trim() || "Guest User",
        lawyerId,
        lawyerName: String(record?.lawyerName || "Unknown Lawyer").trim() || "Unknown Lawyer",
        lawyerEmail: String(record?.lawyerEmail || "").trim().toLowerCase(),
        lawyerSpecialization: String(record?.lawyerSpecialization || "").trim(),
        fee: Number(record?.fee || 0),
        status: String(record?.status || "accepted").toLowerCase(),
        isPaid: Boolean(record?.isPaid || false),
        paidAt: record?.paidAt ? new Date(record.paidAt).toISOString() : null,
        hiredAt: new Date().toISOString(),
    };

    hiringRecords.push(nextRecord);

    return nextRecord;
}

export function getHiringRecords({ userEmail, lawyerId, lawyerEmail } = {}) {
    const normalizedEmail = normalizeEmail(userEmail);
    const normalizedLawyerId = normalizeId(lawyerId);
    const normalizedLawyerEmail = normalizeEmail(lawyerEmail);

    return hiringRecords.filter((record) => {
        if (normalizedEmail && record.userEmail !== normalizedEmail) {
            return false;
        }

        if (normalizedLawyerId && record.lawyerId !== normalizedLawyerId) {
            return false;
        }

        if (normalizedLawyerEmail && record.lawyerEmail !== normalizedLawyerEmail) {
            return false;
        }

        return true;
    });
}

export function hasHiringRecord({ userEmail, lawyerId }) {
    return getHiringRecords({ userEmail, lawyerId }).some((record) => record.status === "accepted");
}

export function addComment(comment) {
    const userEmail = normalizeEmail(comment?.userEmail);
    const lawyerId = normalizeId(comment?.lawyerId);
    const text = String(comment?.comment || "").trim();

    if (!userEmail || !lawyerId || !text) {
        return null;
    }

    const nextComment = {
        id: `comment-${commentSequence++}`,
        userEmail,
        userName: String(comment?.userName || "Guest User").trim() || "Guest User",
        lawyerId,
        lawyerName: String(comment?.lawyerName || "Unknown Lawyer").trim() || "Unknown Lawyer",
        rating: Math.max(1, Math.min(5, Number(comment?.rating || 5))),
        comment: text,
        createdAt: new Date().toISOString(),
    };

    comments.push(nextComment);

    return nextComment;
}

export function getComments({ userEmail, lawyerId } = {}) {
    const normalizedEmail = normalizeEmail(userEmail);
    const normalizedLawyerId = normalizeId(lawyerId);

    return comments
        .filter((comment) => {
            if (normalizedEmail && comment.userEmail !== normalizedEmail) {
                return false;
            }

            if (normalizedLawyerId && comment.lawyerId !== normalizedLawyerId) {
                return false;
            }

            return true;
        })
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function updateComment({ id, userEmail, comment, rating }) {
    const targetId = normalizeId(id);
    const normalizedEmail = normalizeEmail(userEmail);
    const nextText = String(comment || "").trim();

    const index = comments.findIndex((item) => item.id === targetId && item.userEmail === normalizedEmail);

    if (index === -1 || !nextText) {
        return null;
    }

    comments[index] = {
        ...comments[index],
        comment: nextText,
        rating: Math.max(1, Math.min(5, Number(rating || comments[index].rating || 5))),
        updatedAt: new Date().toISOString(),
    };

    return comments[index];
}

export function deleteComment({ id, userEmail }) {
    const targetId = normalizeId(id);
    const normalizedEmail = normalizeEmail(userEmail);

    const index = comments.findIndex((item) => item.id === targetId && item.userEmail === normalizedEmail);

    if (index === -1) {
        return false;
    }

    comments.splice(index, 1);

    return true;
}

export function markHiringRecordPaid({ id, userEmail }) {
    const targetId = normalizeId(id);
    const normalizedUserEmail = normalizeEmail(userEmail);

    const index = hiringRecords.findIndex(
        (record) => record.id === targetId && record.userEmail === normalizedUserEmail
    );

    if (index === -1) {
        return null;
    }

    if (hiringRecords[index].status !== "accepted") {
        return null;
    }

    if (hiringRecords[index].isPaid) {
        return hiringRecords[index];
    }

    hiringRecords[index] = {
        ...hiringRecords[index],
        isPaid: true,
        paidAt: new Date().toISOString(),
    };

    return hiringRecords[index];
}