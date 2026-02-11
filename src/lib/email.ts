import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: Number(process.env.SMTP_PORT) || 587,
	secure: false,
});

export async function sendEmail({
	to,
	subject,
	html,
	text,
}: {
	to: string;
	subject: string;
	html?: string;
	text?: string;
}) {
	const info = await transporter.sendMail({
		from: `"{${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
		to,
		subject,
		text,
		html,
	});
	const previewUrl = nodemailer.getTestMessageUrl(info);
	if (previewUrl) {
		console.log("Preview URL:", previewUrl);
	}
	return info;
}
