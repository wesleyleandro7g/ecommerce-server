# Backend of our ecommerce system

## Install

_Clone the project:_

    git clone https://github.com/DesenCoder/ecommerce-server.git develop -b develop

_Enter the folder:_

    cd develop

_Install the dependencies:_

    Run npm or yarn install

## Configuration

### Environment variables

    Create an (.env) file at the root of the project

Enter the following variables

    AUTH_CLIENT=client-access-key
    AUTH_USER=user-access-key

    STORAGE_TYPE=type-of-image-upload
    AWS_ACCESS_KEY_ID=your-user-id-on-aws-s3
    AWS_DEFAULT_REGION=region-of-uploading-images-on-aws-s3
    AWS_SECRET_ACCESS_KEY=s3-account-password

    MONGO_URL=connection-to-the-mongo-database

    EMAIL=email-for-sending-emails
    PASSWORD=email-password

### OBS:

If you choose to save the images locally, it can be done as follows:

    STORAGE_TYPE=local

    AWS_ACCESS_KEY_ID=null
    AWS_DEFAULT_REGION=null
    AWS_SECRET_ACCESS_KEY=null

Use a yahoo email account
