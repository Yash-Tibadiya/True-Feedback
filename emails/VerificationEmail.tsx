import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Section,
  Text,
  Container,
  Img,
  Button,
  Hr,
  Link,
} from "@react-email/components";
import { Property } from 'csstype';

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Your Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmWUlfBBc4AMP6lQ.woff2",
            format: "woff2",
          }}
          fontWeight={700}
          fontStyle="normal"
        />
      </Head>
      <Preview>
        Your verification code: {otp} - Complete your registration
      </Preview>
      <Section style={main}>
        {/* Header with Logo */}
        <Container style={container}>
          <Section style={logoContainer}>
            <table style={{ width: "100%", textAlign: "center" }}>
              <tr>
                <td style={logo}>
                  <Img
                    src="https://i.postimg.cc/zfJmbXSL/output-onlinepngtools-1-removebg-preview.png"
                    width="64"
                    height="64"
                    alt="True Feedback"
                  />
                </td>
                <td style={logoText}>True Feedback</td>
              </tr>
            </table>
          </Section>

          <Hr style={dividerX} />

          {/* Hero Section with Illustration */}
          <Section style={heroSection}>
            <Img
              src="https://i.postimg.cc/Pfb58BTw/4.jpg"
              width="560"
              height="200"
              alt="Verification"
              style={illustration}
            />
            <Heading as="h1" style={heading}>
              Verify Your Account
            </Heading>
            <Text style={subheading}>
              Please use the code below to complete your registration
            </Text>
          </Section>

          {/* OTP Section */}
          <Section style={otpSection}>
            <Text style={otpCode}>{otp}</Text>
            <Text style={otpDescription}>
              This code will expire in 10 minutes
            </Text>
          </Section>

          {/* CTA Section */}
          <Section style={ctaSection}>
            <Button style={button} href="https://example.com/verify">
              Verify My Account
            </Button>
          </Section>

          {/* Message Section */}
          <Section style={messageSection}>
            <Text style={message}>Hi {username},</Text>
            <Text style={message}>
              Thank you for joining True Feedback! We&apos;re excited to have
              you on board. To ensure the security of your account, we need to
              verify your email address.
            </Text>
            <Text style={message}>
              If you didn&apos;t request this code, please ignore this email or
              contact our support team.
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © {new Date().getFullYear()} True Feedback. All rights reserved.
            </Text>
            <Text style={footerText}>
              <Link href="#" style={link}>
                Privacy Policy
              </Link>{" "}
              •
              <Link href="#" style={link}>
                {" "}
                Terms of Service
              </Link>{" "}
              •
              <Link href="#" style={link}>
                {" "}
                Contact Us
              </Link>
            </Text>
          </Section>
        </Container>
      </Section>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#f5f5f5",
  fontFamily: "Roboto, Verdana, sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "600px",
};

const logoContainer = {
  display: "inline-block", // Use inline-block to align elements horizontally
  verticalAlign: "middle", // Ensure they align properly
};

const logo = {
  display: "inline-block", // Ensure the logo behaves like an inline element
  marginRight: "10px", // Add space between logo and text
};

const logoText = {
  display: "inline-block", // Ensure the text is also inline
  fontSize: "32px",
  fontWeight: "bold",
  marginTop: "15px", // Remove margin around the text
  color: "#2563eb",
};

const divider = {
  borderColor: "#e5e7eb",
  margin: "20px 0",
};

const dividerX = {
  borderColor: "#e5e7eb",
  margin: "20px 0 0 0",
};

const heroSection: { textAlign: Property.TextAlign; padding: string } = {
  textAlign: "center",
  padding: "20px 0",
};

const illustration = {
  margin: "0 auto 20px",
  paddingBottom: "20px",
};

const heading = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#1f2937",
  margin: "0 0 10px",
};

const subheading = {
  fontSize: "16px",
  color: "#6b7280",
  margin: "0",
};

const otpSection: { textAlign: Property.TextAlign; backgroundColor: string; borderRadius: string; padding: string; margin: string; boxShadow: string } = {
  textAlign: "center",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  padding: "20px",
  margin: "30px 0",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
};

const otpCode = {
  fontSize: "32px",
  fontWeight: "bold",
  letterSpacing: "8px",
  color: "#2563eb",
  margin: "10px 0",
  padding: "10px 0",
};

const otpDescription = {
  fontSize: "14px",
  color: "#6b7280",
  margin: "0",
};


const ctaSection: { textAlign: Property.TextAlign; margin: string } = {
  textAlign: "center",
  margin: "30px 0",
};

const button = {
  backgroundColor: "#2563eb",
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  padding: "12px 30px",
};

const messageSection = {
  margin: "30px 0",
};

const message = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#374151",
  margin: "0 0 16px",
};

const footer = {
  textAlign: "center" as const,
  margin: "20px 0 0",
};

const footerText = {
  fontSize: "14px",
  color: "#6b7280",
  margin: "5px 0",
};

const link = {
  color: "#2563eb",
  textDecoration: "none",
};
